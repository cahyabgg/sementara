'use client';

import { useLogin } from '@/components/hooks';
import { Form } from '@/components/forms';

const LoginForm = () => {
	const { username, password, isLoading, isLoadingAdmin, onChange, onSubmit } = useLogin();

	const config = [
		{
			labelText: 'Username',
			labelId: 'username',
			pattern: '^[a-zA-Z0-9_.]+$',
			type: 'text',
			value: username,
			required: true,
			maxLength: 50,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			required: true,
			maxLength: 50,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading || isLoadingAdmin}
			btnText='Masuk'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}

export default LoginForm
