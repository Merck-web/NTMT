import React, {useState} from "react";
import apiAuth from "../../api/auth";
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import {Button, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({setToken, setUser}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('2');


    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setRole(event.target.value)
    };

    async function logIn() {
        if (!login.trim() || !password.trim()) {
            toast.error('Заполните пожалуйста все поля!!!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            try {
                const request = {
                    login: login,
                    password: password,
                    type: role,
                };
                const response = await apiAuth.login(request);
                setUser(response.data.message);
                setToken(response.data.message.token);
            } catch (error) {
                console.error(error);
                console.error('ERROR LOG IN');
                toast.error('Произошла ошибка при входе в личный кабинет. Попробуйте позже или обратитесь в техподдержку', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }


    return (
        <div className="loginPage">
            <div className="login-wrapper">
                <div className="login-wrapper__title">
                    Войти в учетную запись УрФУ
                </div>
                <form onSubmit={logIn} className="form">
                    <div className='mb-3'>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-login">Введите ваш логин</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-login"
                                type='text'
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                label="Введите ваш логин"
                            />
                        </FormControl>
                    </div>
                    <div className='mb-6'>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Введите ваш пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Введите ваш пароль"
                            />
                        </FormControl>
                    </div>


                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Кем вы являетесь</InputLabel>
                        <Select
                            style={{minWidth: '270px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Кем вы являетесь"
                            onChange={handleChange}
                        >
                            <MenuItem value="1">Студент/Преподаватель</MenuItem>
                            <MenuItem value="2">Родитель</MenuItem>
                        </Select>
                    </FormControl>


                    <div className='my-5'>
                        <Button style={{minWidth: '150px'}} variant="contained"
                                color="primary"
                                onClick={() => logIn()}
                        >
                            Войти
                        </Button>
                    </div>

                </form>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                style={{width: '350px'}}
            />
        </div>
    );
}

export default Login;
