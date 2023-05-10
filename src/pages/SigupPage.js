import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../components/button/Button';
import { Field } from '../components/field';
import { IconEyeClose, IconEyeOpen } from '../components/icon';
import Input from '../components/input/Input';
import { Label } from '../components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase-app/firebase-config';
import { Navigate, useNavigate } from 'react-router-dom';

const Container = styled.div`
    /* background-image: url('https://mona.solutions/template/images/banner-news.png'); */
    background-image: url('https://cdn.sforum.vn/sforum/wp-content/uploads/2022/02/3-17.jpg');
`;
const SignUpPageStyles = styled.div`
    transform: translate(36%);
    min-height: 690px;
    max-width: 800px;
    background-color: rgb(222, 186, 214, 0.7);
    border-radius: 10%;
    padding: 10px;
    .logo {
        height: 150px;
        margin: 0 auto 20px;
        border-radius: 9px;
    }
    .heading {
        text-align: center;
        font-weight: bold;
        font-size: 30px;
    }

    .input {
        width: 100%;
        padding: 20px;
        background-color: beige;
        border-radius: 6px;
        transition: all 0.2s linear;
    }
    .input:focus {
        background-color: #f0f0f0;
    }
    .form {
        max-width: 600px;
        margin: 0 auto;
    }
`;
//handle validate use react toastify
const schema = yup.object({
    fullname: yup.string().required('Please enter your fullname'),
    email: yup
        .string()
        .email('Please enter valid email address')
        .required('Please enter your email address'),
    password: yup
        .string()
        .min(8, 'Your password must be at least 8 characters or greater')
        .required('Please enter your password'),
});

//Compoonent
const SigUpPage = () => {
    const [togglePassword, setTogglePassword] = useState(false);
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    //handle add data in database after submit or (handle add user)
    const handleSignUp = async (values) => {
        console.log(errors);

        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        //add data in database
        const colRef = collection(db, 'user');
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });
        toast.success('Register successfully!!!');
        navigate('/');
    };

    //handle validate use react toastify
    useEffect(() => {
        const arrErroes = Object.values(errors);
        if (arrErroes.length > 0) {
            toast.error(arrErroes[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);
    return (
        <Container>
            <SignUpPageStyles>
                <div className="container">
                    <img
                        src="https://banner2.cleanpng.com/20180423/cse/kisspng-flag-of-vietnam-south-vietnam-map-vietnam-vector-5ade694a3e6434.6502167515245253862556.jpg"
                        alt=""
                        className="logo"
                    ></img>
                    <h1 className="heading">MY BLOG</h1>
                    <form className="form" onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
                        <Field>
                            <Label htmlFor="fullname" className="label">
                                Fullname
                            </Label>
                            <Input
                                type="text"
                                name="fullname"
                                placeholder="Enter your fullname"
                                control={control}
                            ></Input>
                        </Field>
                        <Field>
                            <Label htmlFor="email" className="label">
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                control={control}
                            ></Input>
                        </Field>
                        <Field>
                            <Label htmlFor="password" className="label">
                                Password
                            </Label>
                            <Input
                                className="input"
                                name="password"
                                type={togglePassword ? 'text' : 'password'}
                                placeholder="..."
                                hasIcon
                                control={control}
                            >
                                {togglePassword ? (
                                    <IconEyeOpen
                                        onClick={(prev) => {
                                            setTogglePassword(!togglePassword);
                                        }}
                                    ></IconEyeOpen>
                                ) : (
                                    <IconEyeClose
                                        onClick={(prev) => {
                                            setTogglePassword(!togglePassword);
                                        }}
                                    ></IconEyeClose>
                                )}
                            </Input>
                        </Field>

                        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </SignUpPageStyles>
        </Container>
    );
};

export default SigUpPage;
