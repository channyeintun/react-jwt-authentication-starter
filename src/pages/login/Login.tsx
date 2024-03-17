import React, { useEffect } from 'react';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { LoginRequest } from '@/types';
import useAuthStore from '@/store/auth';
import { API } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import { LoginApi } from '@/services/api/login';
import { useLocalStorage } from '@/hooks';

type LoginFormState = LoginRequest & { rememberMe: boolean };

export const Login: React.FC = () => {
    const [formState, setFormState, clearFromStorage] = useLocalStorage<LoginFormState>({
        key: 'login-form-state',
    });

    const { setToken } = useAuthStore();

    const { loading, trigger, error } = useFetch<LoginApi>(API.login);

    useEffect(() => {
        if (error) message.error((error.response?.data as { message: string }).message);
    }, [error]);

    const onFinish = (values: LoginFormState) => {
        if (values.rememberMe) {
            setFormState({
                ...formState,
                ...values,
            });
        } else {
            clearFromStorage();
        }

        trigger(values).then((data) => {
            if (data) {
                setToken(data.token);
            }
        });
    };

    return (
        <div className="flex justify-center">
            <div className="min-w-80 mt-20">
                <div className="flex justify-center mb-10">
                    <img width="140" src="./logo.png" />
                </div>
                <Form
                    layout="vertical"
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={formState && formState.rememberMe ? formState : {}}
                >
                    <Form.Item<Pick<LoginRequest, 'username'>>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<Pick<LoginRequest, 'password'>>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="rememberMe" valuePropName="checked" rules={[{ required: false }]}>
                        <Checkbox
                            onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    rememberMe: e.target.checked,
                                });
                                e.target.checked || clearFromStorage();
                            }}
                        >
                            Remember me
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} className="w-full" type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
