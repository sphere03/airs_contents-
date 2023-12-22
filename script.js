document.addEventListener('DOMContentLoaded', () => {
    loadQuestions('question/001-010.json');
});

function loadQuestions(file) {
    fetch(file)
        .then(response => response.json())
        .then(questions => {
            const questionsContainer = document.getElementById('questions-container');
            questions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-item';
                questionDiv.innerHTML = `
                    <p>${question.text}</p>
                    <ul class="options">
                        ${question.options.map((option, index) => `
                            <li data-answer="${String.fromCharCode(65 + index)}">${String.fromCharCode(65 + index)}) ${option}</li>
                        `).join('')}
                    </ul>
                `;
                questionsContainer.appendChild(questionDiv);
            });
            attachOptionListeners();
        })
        .catch(error => {
            console.error('Error loading the question set:', error);
        });
}

function attachOptionListeners() {
    const options = document.querySelectorAll('.options li');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedOption = e.target.dataset.answer;
            const parentQuestion = e.target.closest('.question-item');
            checkAnswer(selectedOption, parentQuestion);
        });
    });
}

function checkAnswer(selectedOption, questionDiv) {
    // ユーザーの回答をチェックするロジックをここに実装
    alert(`You selected: ${selectedOption}`);
}
