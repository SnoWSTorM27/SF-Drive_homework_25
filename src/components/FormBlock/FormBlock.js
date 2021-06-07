import React, { useState, Fragment, useEffect } from "react";

import cssFormBlock from "./FormBlock.module.css";

import IconButton from '@material-ui/core/IconButton';

import OutlinedInput from '@material-ui/core/OutlinedInput';

import InputAdornment from '@material-ui/core/InputAdornment';


import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import KeyboardDatePicker from '@material-ui/pickers';

import 'date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment, { locale } from "moment";
import {  } from "date-fns/locale/ru";
import "moment/locale/ru";
moment.locale("ru");
import ruLocale from "date-fns/locale/ru";

import {useHttp} from "../../hooks/http.hook";


function FormBlock () {

    const {loading, request, error} = useHttp();

    // request("/api/auth/register", "POST", {form: '123'});
    // useEffect


    const registerHandler = async () => {
        const forms = [
            name, 
            selectedDate,
            email,
            phone,
            serialPass,
            selectedDatePass,
            provide,
            idPassOffice,
            idDrivingLicense,
            selectedDateDrivingLicence
        ].map(field => field.value);
        forms.push(values.password)
        const val = {
            name, 
            selectedDate,
            email,
            phone,
            serialPass,
            selectedDatePass,
            provide,
            idPassOffice,
            idDrivingLicense,
            selectedDateDrivingLicence,
            password: values
        }
        console.log(val)
        const validtaion = handleValidation(val);
        if (validtaion) await request("/api/auth/register", "POST", forms);
    }

    const [name, setName] = useState({ value: '', error: null });     
    function onNameChange (e) {
        setName({value: e.target.value, error: null});
    }

    const [selectedDate, setSelectedDate] = useState( { value: new Date('01-01-1970'), error: null } );
    const handleDateChange = (date) => {
        setSelectedDate({value: date, error: null});
      };

    const [email, setEmail] = useState({ value: "", error: null } );   
    function onEmailChange (e) {
        setEmail({value: e.target.value, error: null});
    }

    const [phone, setPhone] = useState({ value: "", error: null } );   
    function onPhoneChange (e) {
        setPhone({value: e.target.value, error: null});
    }

    const [serialPass, setSerealPass] = useState({ value: "", error: null });   
    function onSerialPassChange (e) {
        setSerealPass({value: e.target.value, error: null});
    }

    const [selectedDatePass, setSelectedDatePass] = useState({ value: new Date('01-01-1970'), error: null });
    const handleDateChangePass = (date2) => {
        setSelectedDatePass({value: date2, error: null});
    };

    const [provide, setWhomProvidedPass] = useState({ value: "", error: null });   
    function onWhomProvidedPassChange (e) {
        setWhomProvidedPass({value: e.target.value, error: null});
    }

    const [idPassOffice, setIdPassOffice] = useState({ value: "", error: null });   
    function onIdPassOfficeChange (e) {
        setIdPassOffice({value: e.target.value, error: null});
    }

    const [idDrivingLicense, setIdDrivingLicense] = useState({ value: "", error: null });   
    function onIdDrivingLicenseChange (e) {
        setIdDrivingLicense({value: e.target.value, error: null});
    }

    const [selectedDateDrivingLicence, setSelectedDateDrivingLicence] = useState({ value: new Date('01-01-1970'), error: null })


    const handleDateChangeDrivingLicence = (date3) => {
        setSelectedDateDrivingLicence({value: date3, error: null});
    };

  

    // function handleDateChange (e) {
    //     setSelectedDate(e.target.value);
    // }

    const [values, setValues] = useState({
        amount: '',
        password: '',
        passwordValid: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: null
    });

    const handleChange = (prop) => (event) => {
        values.error = null;
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    // Валидация формы
    const handleValidation = (value) => {
        debugger
        let validationSuccess = true
        const emailRegExp = new RegExp('^[^\s@]+@[^\s@]+$')
        
        if (!emailRegExp.test(value.email.value)) {
            value.email.error = "Неверная почта"
            validationSuccess = false;
        }
        if (value.password.password !== value.password.passwordValid) {
            value.password.error = "Пароли не совпадают"
            validationSuccess = false;
        }
        if (value.password.password.length < 6) {
            value.password.error = "Пароль должен быть больше 5 символов"
            validationSuccess = false;
        }
        return validationSuccess
    }

    const formInvalidToSubmit = () => {
        const forms = [
            name, 
            selectedDate,
            email,
            phone,
            serialPass,
            selectedDatePass,
            provide,
            idPassOffice,
            idDrivingLicense,
            selectedDateDrivingLicence
        ].map(field => field.value);
        forms.push(values.password);

        const emptyFields = forms.filter(value => !value);

        isFormInvalid(emptyFields.length !== 0)
        console.log(emptyFields.length !== 0, emptyFields)
    }

    const [flag, setValidForm] = useState(true);
    const isFormInvalid = (isFormInvalid) => {
        setValidForm(isFormInvalid);
    };


   
    // const forms = [];
    // const val = forms.push(name, 
    //     selectedDate,
    //     email,
    //     phone,
    //     serialPass,
    //     selectedDatePass,
    //     provide,
    //     idPassOffice,
    //     idDrivingLicense,
    //     selectedDateDrivingLicence,
    //     values.password
    //     );

    console.log( values.error)
   
    
    


    // const [value, setValue] = React.useState(new Date());

    return (
        <>
        <form onChange={formInvalidToSubmit}>
            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Информация о вас</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>ФИО</p>
                    <input className={cssFormBlock.typeinput} type="text"  value={name.value} onChange={onNameChange} placeholder="ФИО полностью"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата рождения</p>
                    <div>
                        <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
                            
                            <KeyboardDatePicker
                                locale={"ruLocale"}
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={selectedDate.value}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                    </div>
                                
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Электронная почта</p>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="email"
                        value={email.value}
                        onChange={onEmailChange}
                        error={!!email.error}
                        placeholder="mail@example.com"
                    />
                    {email.error ? (<div className={cssFormBlock.errorlabel}>{email.error}</div>) : null}
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Телефон</p>
                    <input className={cssFormBlock.typeinput} type="tel" value={phone.value} onChange={onPhoneChange} placeholder="+7 900 000-00-00"/>
                </div>    
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Паспорт</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Серия и номер</p>
                    <input className={cssFormBlock.typeinput} type="text" value={serialPass.value} onChange={onSerialPassChange} placeholder="0000 000000"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата выдачи</p>
                    <div>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={selectedDatePass.value}
                                onChange={handleDateChangePass}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Кем выдан</p>
                    <input className={cssFormBlock.typeinput} type="text" value={provide.value} onChange={onWhomProvidedPassChange} placeholder="Название органа выдавшего паспорт"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Код подразделения</p>
                    <input className={cssFormBlock.typeinput} type="text" value={idPassOffice.value} onChange={onIdPassOfficeChange} placeholder="000-000"/>
                </div>    
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Водительское удостоверение</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Серия и номер</p>
                    <input className={cssFormBlock.typeinput} type="text" value={idDrivingLicense.value} onChange={onIdDrivingLicenseChange} placeholder="0000 000000"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата выдачи</p>
                    <div>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={selectedDateDrivingLicence.value}
                                onChange={handleDateChangeDrivingLicence}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                    </div>   
                </div>
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Пароль</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Придумайте пароль</p>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        error={!!values.error}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Повторите пароль</p>
                    <OutlinedInput
                        id="outlined-adornment-passwordValid"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.passwordValid}
                        onChange={handleChange('passwordValid')}
                        error={!!values.error}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                {values.error ? (<div className={cssFormBlock.errorlabel}>{values.error}</div>) : null}
                </div>
            </div>

            <div className={cssFormBlock.wrapperSubmitBtn}>
                <button 
                    className={cssFormBlock.btnSubmit}
                    type='button'
                    onClick={registerHandler}
                    disabled={flag}
                >
                    Продолжить
                </button>
                
            </div>           
        </form>
      </> 
    );    

}

export default FormBlock;