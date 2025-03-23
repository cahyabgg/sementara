import { useState, ChangeEvent, FormEvent } from 'react';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from 'next/navigation';

export default function useRegister() {
	const router = useRouter();
    const { toast } = useToast();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		email : "",
		username : "",
		password : "",
		passwordConfirm: "",
	});

	const {
		email,
		username,
		password,
		passwordConfirm,
	} = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (password === passwordConfirm) {
			register({
				email,
				username,
				password,
			})
				.unwrap()
				.then(() => {
					toast({
                        title: "Berhasil mendaftarkan akun. Verifikasi email pada link yang dkirimkan.",
                        variant: "default", 
                    });
					router.push("/auth/login")
				})
				.catch(() => {
					toast({
                        title: "Gagal mendaftarkan akun",
                        variant: "destructive", 
                    });
				});
		} else {
			toast({
                title: "Konfirmasi password tidak sama",
                variant: "destructive", 
            });
		}
	};
	

	return {
		email,
		username,
		password,
		passwordConfirm,
		isLoading,
		onChange,
		onSubmit,
	};
}
