import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from 'react';

function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [feedback, setFeedback] = useState([]);
    const [check, setCheck] = useState(false);

    const nameValue = document.getElementById('name');
    const emailValue = document.getElementById('email');
    const textValue = document.getElementById('text');

    const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const date = new Date();

    function addFeedback() {
        if (name === '') {
            setCheck(true);
        } else if (email === '') {
            setCheck(true);
        } else if (checkEmail.test(email) === false) {
            setCheck(true);
        } else if (text === '') {
            setCheck(true);
        } else {
            setFeedback([...feedback, {
                name: name,
                email: email,
                text: text,
                createdAt: date.toLocaleString(),
                avatar: 'https://picsum.photos/200/300?random&t=' + new Date().getTime() + ')',
            }]);

            setName('');
            setEmail('');
            setText('');

            nameValue.value = '';
            emailValue.value = '';
            textValue.value = '';

            setCheck(false);
        }
    }

    function deleteFeedback(index) {
        setFeedback([...feedback.slice(0, index), ...feedback.slice(index + 1)]);
    }

    useEffect(() => {
        setFeedback(JSON.parse(window.localStorage.getItem('feedback')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    return (
        <div className="App">
            <div className={'reviews'}>
                <h2 className={'reviews__header'}>Отзывы:</h2>
                <div className={'reviews__review-wrapper'}>
                    {feedback.map((element, index) =>
                        <div className={'review'} key={index}>
                            <div className={'review__avatar'}>
                                <Avatar src={element.avatar}/>
                            </div>
                            <div className={'review-wrapper'}>
                                <div className={'review__title'}>{element.name}</div>
                                <div className={'review__date'}>{element.createdAt}</div>
                                <div className={'review__text'}>{element.text}</div>
                            </div>
                            <div className={'review__delete-button'}>
                                <IconButton onClick={() => deleteFeedback(index)} aria-label="delete" size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <form className={'formInput'}>
                <h2 className={'formInput__header'}>Обратная связь:</h2>
                <TextField className={'formInput__input'} id="name" error={check && !name}
                           helperText={check && !name ? 'Введите имя' : ' '} label="Имя" variant="outlined"
                           onChange={(event) => setName(event.target.value)}/>
                <TextField className={'formInput__input'} id="email"
                           error={(check && !email) || (check && !checkEmail.test(email))} label="Почта"
                           helperText={check && !email ? 'Введите почту' : check && !checkEmail.test(email) ? 'Почта введена неверно' : ' '}
                           variant="outlined" onChange={(event) => setEmail(event.target.value)}/>
                <TextField selected className={'formInput__input'} id="text" error={check && !text}
                           helperText={check && !text ? 'Введите что-нибудь' : ' '} label="Текст..."
                           variant="outlined" fullWidth multiline rows={4}
                           onChange={(event) => setText(event.target.value)}/>
                <Button className={'formInput__input'} variant="contained" onClick={addFeedback}>Отправить</Button>
            </form>
        </div>
    );
}

export default App;
