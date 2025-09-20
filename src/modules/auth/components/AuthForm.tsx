import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Card, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/core/store/types';
import {loginRequest} from "@/modules/auth/store/actions";

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = ({email, password}: {email: string, password: string}) => {
        dispatch(loginRequest(email, password));
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f0f2f5'
        }}>
            <Card title="Admin Panel Login" style={{ width: 400 }}>
                <Formik
                    initialValues={{ email: 'test@test.ru', password: 'khro2ij3n2730' }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>

                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                style={{ marginBottom: 16 }}
                            />
                        )}

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ width: '100%' }}
                        >
                            Login
                        </Button>
                    </Form>
                </Formik>
            </Card>
        </div>
    );
};