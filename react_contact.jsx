//* you need npm i react and styled-components for this component

import React, { useState } from 'react';

import styled from 'styled-components';

import GrGrey from '../images/ground_grey.svg';
import GrColor from '../images/ground_color.svg';

const Contact = () => {
  const [error, setError] = useState(''); //* error message
  const [success, setSuccess] = useState(''); //* success message
  const [name, setName] = useState(''); //* form state
  const [email, setEmail] = useState(''); //* form state
  const [message, setMessage] = useState(''); //* form state
  const [formData, setFormData] = useState({
    //* form state
    reason: ''
  });
  //* function to set reason form state
  //* deals with the select buttons
  const choice = (e) => {
    const target = e.target;
    const reason = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [reason]: value
    });
  };

  //* function deals with submit form action
  const handleSubmit = (e) => {
    e.preventDefault(); //* cancel default action of submit
    //* check the fields you care about are not empty
    if (!name || !email || !message) {
      setError('Please fill out the required fields');
    }
    //* check that the email address has the symbol
    if (!email.includes('@')) {
      setError('Please give a correct email');
    }
    //* required fields are not empty, success message
    if (name && email && message) {
      setSuccess('Thank you, mail is sent');
    }
    //* gather data into single object
    const data = {
      name,
      email,
      message,
      formData
    };
    //* show the data
    console.log(data);
  };

  return (
    <SectionWrapper>
      <Container>
        <LeftInfo>
          <LoginTitle>Get in touch!</LoginTitle>
          <P>
            I would love to hear from you! Whether you want to say hi, suggest
            features or inquire more about the project. This is a collaborative
            project and I am always looking for help. I keep both Twitter and
            Facebook updated, so be sure to follow the project there.
          </P>
          <br />
          <P>
            Email: hermitplus@test.com
            {'\n'} //* line break in js Typical reply within 24 hours
          </P>
          <br /> //* line break tag - jsx
          <P>You can also reach me through Facebook page - Messenger</P>
          <Pic src={GrColor} alt='Minecraft Grass' />
        </LeftInfo>
        <RightInfo>
          <form onSubmit={handleSubmit} className='signIn-form'>
            {error && <ShowError>{error}</ShowError>} //* when error, show error
            {success && <ShowSuccess>{success}</ShowSuccess>} //* when success,
            show success
            <InputWrap>
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
            </InputWrap>
            <InputWrap>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </InputWrap>
            <InputWrap>
              <InputChoice>
                <Input
                  type='radio'
                  id='reason'
                  name='reason'
                  value='dev inquiry'
                  onChange={choice}
                />
                <Label>I would like to collaborate on development</Label>
              </InputChoice>
              <InputChoice>
                <Input
                  type='radio'
                  id='reason'
                  name='reason'
                  value='design inquiry'
                  onChange={choice}
                />
                <Label>I would like to collaborate on design</Label>
              </InputChoice>
              <InputChoice>
                <Input
                  type='radio'
                  id='reason'
                  name='reason'
                  value='beta inquiry'
                  onChange={choice}
                />
                <Label>I would like to sign up for beta testing</Label>
              </InputChoice>
            </InputWrap>
            <InputWrap>
              <Label htmlFor='message'>Message</Label>
              <TextArea
                cols='4'
                rows='5'
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='How can I help you?'
              />
            </InputWrap>
            <ButtonWrap>
              <Button type='submit'>Find Diamonds</Button>
            </ButtonWrap>
          </form>
          <img src={GrGrey} alt='Minecraft Grass' />
        </RightInfo>
      </Container>
    </SectionWrapper>
  );
};

export default Contact;
//*style the components
const SectionWrapper = styled.section`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  grid-template-columns: fit-content(40%);
  max-width: 900px;
  justify-content: center;
`;

const ShowError = styled.p`
  color: var(--red);
`;
const ShowSuccess = styled.p`
  color: var(--light-green);
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  max-width: 400px;
  max-height: 700px;
  background-color: var(--cloud-blue);
  border: 2px solid var(--smoke);
  padding: 2em 2em 0 2em;
  margin-right: 1em;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  max-width: 400px;
  max-height: 700px;
  border: 2px solid var(--smoke);
  padding: 2em 2em 0 2em;
  margin-right: 1em;
`;

const LoginTitle = styled.h1`
  font-size: 64px;
  margin-bottom: 3rem;
  color: var(--burnt);
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const InputChoice = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  label {
    margin-left: 0.3rem;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 2rem;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Kanit', sans-serif;
  font-size: 14px;
  color: var(--burnt);
`;

const Input = styled.input`
  padding: 0.5rem;
  background-color: var(--input-back);
  border: 1px solid var(--smoke);
  border-radius: 3px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  background-color: var(--input-back);
  border: 1px solid var(--smoke);
  border-radius: 3px;
`;

const Button = styled.button`
  font-family: 'Kanit', sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.15rem;
  color: var(--text-main);
  background-color: var(--light-blue);
  border: none;
  border-radius: 3px;
  padding: 0.4rem 1rem;
`;

const P = styled.p`
  display: flex;
  justify-content: start;
  font-size: 14px;
  color: var(--burnt);
`;

const Pic = styled.img`
  margin-top: 5em;
`;
