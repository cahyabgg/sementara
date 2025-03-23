import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout, setAdmin } from '../features/authSlice';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/`,
	credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
  if ((typeof args === 'string' && (args === '/auth/login/' || args === '/auth/login/admin')) || (typeof args === 'object' && (args.url === '/auth/login/' || args.url === '/auth/login/admin'))) {
    return baseQuery(args, api, extraOptions);
  }
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: '/auth/refresh_token',
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + Cookies.get('refreshToken'),
						},
					},
					api,
					extraOptions
				);
        const data = refreshResult.data as any;
				if (data) {
					Cookies.set('accessToken', data.data.accessToken, { expires: 1 / 24 });
					Cookies.set('refreshToken', data.data.refreshToken, { expires: 1 });
          api.dispatch(setAuth());
          if (data.data.user.role === 'ADMIN') {
            api.dispatch(setAdmin());
          }
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
          Cookies.remove('accessToken');
				  Cookies.remove('refreshToken');
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	keepUnusedDataFor: 600,
	endpoints: builder => ({}),
});
