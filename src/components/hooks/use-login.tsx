import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginAdminMutation, useLoginMutation } from '@/redux/features/authApiSlice';
import { setAdmin, setAuth, setEmail, setUsername } from '@/redux/features/authSlice';
import { useToast } from "@/components/hooks/use-toast"
import Cookies from 'js-cookie';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
    const { toast } = useToast();
	const [login, { isLoading }] = useLoginMutation();
	const [loginAdmin, { isLoading: isLoadingAdmin }] = useLoginAdminMutation();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ username, password })
			.unwrap()
			.then((response) => {
				dispatch(setAuth());
				dispatch(setEmail(response.data.user.email));
				dispatch(setUsername(response.data.user.username));
				Cookies.set('accessToken', response.data.accessToken, { expires: 1 / 24 });
				Cookies.set('refreshToken', response.data.refreshToken, { expires: 1 });
				toast({
					title: "Berhasil Login",
					variant: "default", 
				});
				router.push('/homepage');
			})
			.catch(() => {
				loginAdmin({ username, password })
					.unwrap()
					.then((response) => {
						dispatch(setAuth());
						dispatch(setAdmin());
						dispatch(setEmail(response.data.user.email));
						dispatch(setUsername(response.data.user.username));
						Cookies.set('accessToken', response.data.accessToken, { expires: 1 / 24 });
						Cookies.set('refreshToken', response.data.refreshToken, { expires: 1 });
						toast({
							title: "Berhasil Login",
							variant: "default", 
						});
						router.push('/admin');
					})
					.catch(() => {
						toast({
							title: "Gagal Login",
							variant: "destructive", 
						});
					});
			});
	};

	return {
		username,
		password,
		isLoading,
		isLoadingAdmin,
		onChange,
		onSubmit,
	};
}
