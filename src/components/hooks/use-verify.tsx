import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad, setUsername, setAdmin, setEmail } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function useVerify() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify({})
			.unwrap()
			.then((response) => {
				dispatch(setAuth());
				dispatch(setUsername(response.data.username));
				dispatch(setEmail(response.data.email));
				if (response.data.role === 'ADMIN') {
					dispatch(setAdmin());
				}
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, []);
}