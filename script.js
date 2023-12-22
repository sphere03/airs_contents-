document.addEventListener('DOMContentLoaded', () => {
    // 問題を表示するコンテナの取得
    const questionContainer = document.getElementById('question-container');

    // 問題セットをロードする関数
    function loadQuestionSet(setId) {
        // JSONファイルから問題セットを非同期に取得
        fetch(`questions/${setId}.json`)
        .then(response => response.json())
        .then(data => {
            displayQuestions(data); // 問題を表示
        }).catch(error => {
            console.error('Error loading questions:', error);
        });
    }

    // 問題を表示する関数
    function displayQuestions(questions) {
        // コンテナの中身をクリア
        questionContainer.innerHTML = '';
        // 問題ごとにHTMLを生成
        questions.forEach(question => {
            const questionHTML = `
                <div class="question">
                    <p>${question.text}</p>
                    <div class="options">
                        ${Object.keys(question.options).map(option => `
                            <button onclick="selectOption('${option}', '${question.id}')">${option}: ${question.options[option]}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            questionContainer.innerHTML += questionHTML;
        });
        // 問題コンテナを表示
        questionContainer.style.display = 'block';
    }

    // 選択肢が選ばれたときの処理
    window.selectOption = function(selectedOption, questionId) {
        // ここで選択肢の正誤を判断
        console.log(`Selected option: ${selectedOption} for question ID: ${questionId}`);
        // 正解なら「完璧」、不正解なら「不正解」の表示を切り替える処理をここに書く
    }

    // ボタンにイベントリスナーを設定
    const buttons = document.querySelectorAll('#list-container button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const setId = e.target.textContent.trim();
            loadQuestionSet(setId);
        });
    });
});
