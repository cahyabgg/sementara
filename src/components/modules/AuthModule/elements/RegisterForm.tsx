'use client';

import { useRegister } from '@/hooks';
import { Form } from '@/components/forms';


const RegisterForm = () => {
	const {
		email,
		username,
		password,
		passwordConfirm,
		teamName,
		teamMember1,
		teamMember2,
		teamMember3,
		isLoading,
		onChange,
		onSubmit,
	} = useRegister();

	const config = [
		{
			labelText: 'Email',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
			maxLength: 50,
		},
		{
			labelText: 'Nama Tim',
			labelId: 'teamName',
			type: 'text',
			value: teamName,
			required: true,
			maxLength: 50,
		},
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
			labelText: 'Anggota 1',
			labelId: 'teamMember1',
			type: 'text',
			value: teamMember1,
			required: true,
			maxLength: 50,
		},
		{
			labelText: 'Anggota 2',
			labelId: 'teamMember2',
			type: 'text',
			value: teamMember2,
			required: true,
			maxLength: 50,
		},
		{
			labelText: 'Anggota 3',
			labelId: 'teamMember3',
			type: 'text',
			value: teamMember3,
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
		{
			labelText: 'Konfirmasi password',
			labelId: 'passwordConfirm',
			type: 'password',
			value: passwordConfirm,
			required: true,
			maxLength: 50,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Daftar'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}

export default RegisterForm
