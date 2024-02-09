import React, { useState } from 'react';

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: 0 // Assuming default correct index is 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const uploadData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex
    };

    const questionsApi = "http://localhost:4000/questions";
    fetch(questionsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    })
    .then((response) => response.json())
    .then((newQuestion) => console.log(newQuestion))
    .catch((error) => console.error('Error:', error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
      <input type="text" name="answer1" value={formData.answer1} onChange={handleChange} />
      <input type="text" name="answer2" value={formData.answer2} onChange={handleChange} />
      <input type="text" name="answer3" value={formData.answer3} onChange={handleChange} />
      <input type="text" name="answer4" value={formData.answer4} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
