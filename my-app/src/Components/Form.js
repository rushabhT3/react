import {useState} from 'react';
import FormInput from './FormInput';
import SubmissionList from './SubmissionList';

const Form = () => {
    const [name ,setName] = useState('')
    const [age ,setAge] = useState('')
    const [submissions ,setSubmissions] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && age && age >= 0){
            const id = new Date().toString();
            setSubmissions([...submissions, {name, age, id}])
            setAge('');
            setName('');
        } else {
            alert('kindly enter valid inputs 😊');
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <FormInput label='Name' id='name' type='text' value={name} setValue={setName}/>
                <FormInput label='Age' id='age' type='number' value={age} setValue={setAge}/>
                <button type='submit'>Submit</button>
            </form>
            <SubmissionList submissions={submissions}/>
        </div>
    )
}

export default Form;