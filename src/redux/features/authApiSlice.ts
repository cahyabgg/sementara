import { apiSlice } from '../services/apiSlice';
import Cookies from 'js-cookie';


const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: ({ username, password }) => ({
				url: '/auth/login/',
				method: 'POST',
				body: { username, password },
			}),
		}),
		loginAdmin: builder.mutation({
			query: ({ username, password }) => ({
				url: '/auth/login/admin',
				method: 'POST',
				body: { username, password },
			}),
		}),
		register: builder.mutation({
			query: ({
				email,
				username,
				password,
				teamName,
				kecanduan,
			}) => ({
				url: '/auth/register/',
				method: 'POST',
				body: {
					email,
					username,
					password,
					teamName,
					kecanduan,
				},
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: '/auth/access_token_verify',
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
				body: {
					refreshToken: Cookies.get('refreshToken')
				}
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLoginAdminMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
} = authApiSlice;
