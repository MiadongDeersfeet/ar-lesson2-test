import { useState } from 'react'
import './App.css'

function App() {
  const arabicToKoreanQuestions = [
    { id: 1, prompt: 'مُوَظَّفٌ', options: ['직원', '유모', '온화한'], answer: '직원' },
    { id: 2, prompt: 'شَرِبَ', options: ['그는 마셨다', '그는 먹었다', '그는 갔다'], answer: '그는 마셨다' },
    { id: 3, prompt: 'عَرُوسٌ', options: ['신랑', '신부', '교수'], answer: '신부' },
    { id: 4, prompt: 'عَرِيسٌ', options: ['신랑', '신부', '우둔한'], answer: '신랑' },
    { id: 5, prompt: 'مُرْضِعٌ', options: ['직원', '유모', '온화한'], answer: '유모' },
  ]

  const koreanToArabicQuestions = [
    { id: 'k2a-1', prompt: '날씬한', options: ['نَحِيفٌ', 'ثَقِيلٌ', 'شَاطِرٌ'], answer: 'نَحِيفٌ' },
    { id: 'k2a-2', prompt: '살찐', options: ['سَمِينٌ', 'حَامِلٌ', 'قَدِيمٌ'], answer: 'سَمِينٌ' },
    { id: 'k2a-3', prompt: '오래된', options: ['جَدِيدٌ', 'قَدِيمٌ', 'شَدِيدٌ'], answer: 'قَدِيمٌ' },
    { id: 'k2a-4', prompt: '새로운', options: ['نَظِيفٌ', 'جَدِيدٌ', 'مُعْتَدِلٌ'], answer: 'جَدِيدٌ' },
    { id: 'k2a-5', prompt: '가난한', options: ['طَوِيلٌ', 'فَقِيرٌ', 'جَالِسٌ'], answer: 'فَقِيرٌ' },
  ]

  const wordMatchingQuestions = [
    {
      id: 'wm-16',
      prompt: '11. 다음 중 서로 관련된 단어끼리 짝지어진 것이 아닌 것은?',
      options: [
        { id: '1', text: 'مَرِيضٌ - مُسْتَشْفًى' },
        { id: '2', text: 'بَيْتٌ - دَارٌ' },
        { id: '3', text: 'أُسْتَاذٌ - جَامِعَةٌ' },
        { id: '4', text: 'أَمَامَ - حَامِلٌ' },
      ],
      answer: '4',
      answerLabel: '4번',
    },
    {
      id: 'wm-17',
      prompt: '12. 다음 단어를 꾸며주는 형용사로 적절하지 않은 것은?',
      word: 'غُرْفَةٌ',
      options: [
        { id: 'صَغِيرٌ', text: 'صَغِيرٌ' },
        { id: 'لَذِيذٌ', text: 'لَذِيذٌ' },
        { id: 'كَبِيرٌ', text: 'كَبِيرٌ' },
      ],
      answer: 'لَذِيذٌ',
      answerLabel: 'لَذِيذٌ',
    },
    {
      id: 'wm-18',
      prompt: '13. 다음 단어를 꾸며주는 형용사로 적절하지 않은 것은?',
      word: 'حَدِيقَةٌ',
      options: [
        { id: 'نَظِيفٌ', text: 'نَظِيفٌ' },
        { id: 'جَمِيلٌ', text: 'جَمِيلٌ' },
        { id: 'أَحْمَقُ', text: 'أَحْمَقُ' },
      ],
      answer: 'أَحْمَقُ',
      answerLabel: 'أَحْمَقُ',
    },
  ]

  const subjectiveWordQuestions = [
    { id: 'sw-11', prompt: '19. 다음 단어의 한국어 뜻을 쓰시오.', word: 'بَيْتُ الطَّلَبَةِ', answers: ['기숙사'], answerLabel: '기숙사' },
    { id: 'sw-12', prompt: '20. 다음 단어의 한국어 뜻을 쓰시오.', word: 'مُسْتَشْفًى', answers: ['병원'], answerLabel: '병원' },
    { id: 'sw-13', prompt: '21. 다음 단어의 한국어 뜻을 쓰시오.', word: 'جَامِعَةٌ', answers: ['대학교', '대학', '연맹'], answerLabel: '대학교 또는 대학 또는 연맹' },
    { id: 'sw-14', prompt: '22. 다음 단어의 한국어 뜻을 쓰시오.', word: 'حَدِيقَةٌ', answers: ['정원', '공원'], answerLabel: '정원 또는 공원' },
    { id: 'sw-15', prompt: '23. 다음 단어의 한국어 뜻을 쓰시오.', word: 'مَطَارٌ', answers: ['공항'], answerLabel: '공항' },
  ]

  const listeningQuestions = [
    {
      id: 'ls-1',
      audioUrl: 'https://kh-3927.s3.ap-southeast-2.amazonaws.com/%EB%84%88%EB%8A%94+%EC%A7%81%EC%9B%90%EC%9D%B4%EB%83%90.mp3',
      options: [
        '당신은 직원입니까? / 아니요, 저는 학생입니다.',
        '당신은 직원입니까? / 아니요, 저는 교수입니다.',
        '당신은 교수입니까? / 아니요, 저는 직원입니다.',
      ],
      answer: '당신은 직원입니까? / 아니요, 저는 교수입니다.',
    },
    {
      id: 'ls-2',
      audioUrl: 'https://kh-3927.s3.ap-southeast-2.amazonaws.com/%EC%98%A4%EB%8A%98+%EC%82%AC%EA%B3%BC+%EB%A7%9B%EC%9E%88%EC%96%B4.mp3',
      options: ['오늘 사과가 깨끗한가요?', '오늘 사과가 맛있나요?', '오늘 사과가 큰가요?'],
      answer: '오늘 사과가 맛있나요?',
    },
    {
      id: 'ls-3',
      audioUrl: 'https://kh-3927.s3.ap-southeast-2.amazonaws.com/%EC%8B%A0%EB%9E%91+%EC%8B%A0%EB%B6%80%EA%B0%80+%EB%B0%A9%EC%97%90+%EC%9E%88%EB%8B%A4.mp3',
      options: [
        'العَرِيسُ الجَميلُ وَالعَرُوسُ الطَّويلَةُ فِي الغُرْفَةِ',
        'العَرُوسُ الجَميلَةُ وَالعَرِيسُ الطَّويلُ فِي الحَديقَةِ',
        'العَرُوسُ الجَميلَةُ وَالعَرِيسُ الطَّويلُ فِي الغُرْفَةِ',
      ],
      answer: 'العَرُوسُ الجَميلَةُ وَالعَرِيسُ الطَّويلُ فِي الغُرْفَةِ',
    },
    {
      id: 'ls-4',
      audioUrl: 'https://kh-3927.s3.ap-southeast-2.amazonaws.com/%ED%95%99%EC%83%9D%EB%93%A4%EC%9D%B4+%EA%B5%90%EC%8B%A4%EC%97%90+%EC%9E%88%EB%8B%A4.mp3',
      options: [
        'الطَّالِبُ العَرَبِيُّ وَالطَّالِبَةُ الصِّينِيَّةُ فِي الفَصْلِ',
        'الطَّالِبُ الصِّينِيُّ وَالطَّالِبَةُ العَرَبِيَّةُ فِي الفَصْلِ',
        'الطَّالِبُ العَرَبِيُّ وَالطَّالِبَةُ الصِّينِيَّةُ فِي الحَديقَةِ',
      ],
      answer: 'الطَّالِبُ العَرَبِيُّ وَالطَّالِبَةُ الصِّينِيَّةُ فِي الفَصْلِ',
    },
    {
      id: 'ls-5',
      audioUrl: 'https://kh-3927.s3.ap-southeast-2.amazonaws.com/%EA%B7%B8+%EB%8C%80%ED%95%99%EA%B5%90%EB%8A%94+%EA%B8%B0%EC%88%99%EC%82%AC%EC%97%90%EC%84%9C+%EA%B0%80%EA%B9%9D%EB%8B%A4.mp3',
      options: [
        'الجَامِعَةُ أَمَامَ بَيْتِ الطَّلَبَةِ',
        'الجَامِعَةُ قَرِيبَةٌ مِنْ بَيْتِ الطَّلَبَةِ',
        'الجَامِعَةُ بَعِيدَةٌ عَنْ بَيْتِ الطَّلَبَةِ',
      ],
      answer: 'الجَامِعَةُ قَرِيبَةٌ مِنْ بَيْتِ الطَّلَبَةِ',
    },
  ]

  const wordCardMatchPairs = [
    { id: 'pair-1', left: 'حَلِيبٌ', right: '우유' },
    { id: 'pair-2', left: 'أَيْضًا', right: '역시, 또한' },
    { id: 'pair-3', left: 'شَاطِرٌ', right: '영리한' },
    { id: 'pair-4', left: 'مَرْأَةٌ', right: '여자' },
    { id: 'pair-5', left: 'نَافِعٌ', right: '유익한' },
    { id: 'pair-6', left: 'بَلَدٌ', right: '나라' },
    { id: 'pair-7', left: 'رِجْلٌ', right: '다리' },
    { id: 'pair-8', left: 'رَجُلٌ', right: '남자' },
  ]

  const draggableWordCards = [
    { id: 'drag-1', text: 'حَلِيبٌ' },
    { id: 'drag-2', text: 'أَيْضًا' },
    { id: 'drag-3', text: 'شَاطِرٌ' },
    { id: 'drag-4', text: 'مَرْأَةٌ' },
    { id: 'drag-5', text: 'نَافِعٌ' },
    { id: 'drag-6', text: 'بَلَدٌ' },
    { id: 'drag-7', text: 'رِجْلٌ' },
    { id: 'drag-8', text: 'رَجُلٌ' },
  ]

  const sentenceTestQuestions = [
    {
      id: 'st-25',
      prompt: '25. 다음 내용을 읽고 알 수 있는 내용으로 옳지 않은 것은?',
      passage: [
        '.مُحَمَّدٌ طَالِبٌ فِي الجَامِعَةِ، وَبَيْتُ الطَّلَبَةِ قَرِيبٌ مِنَ الجَامِعَةِ',
        '.الجَامِعَةُ كَبِيرَةٌ وَجَمِيلَةٌ، وَالطَّالِبُ العَرَبِيُّ وَالطَّالِبَةُ الصِّينِيَّةُ فِي الفَصْلِ',
        '.المُوَظَّفُ جَالِسٌ عَلَى الكُرْسِيِّ، وَهُوَ سَمِينٌ',
        '.الطَّقْسُ اليَوْمَ مُعْتَدِلٌ، وَمُحَمَّدٌ يَشْرَبُ حَلِيبًا',
      ],
      options: [
        { id: '1', text: '① 무함마드는 대학교 학생이다' },
        { id: '2', text: '② 오늘 날씨가 온화하다' },
        { id: '3', text: '③ 교수는 의자 위에 앉아 있다' },
        { id: '4', text: '④ 아랍 남학생과 중국 여학생이 교실에 있다' },
      ],
      answer: '3',
      answerLabel: '③ 교수는 의자 위에 앉아 있다',
    },
  ]

  const questionFlow = [
    ...arabicToKoreanQuestions.map((question, index) => ({
      type: 'a2k',
      sectionTitle: '아랍어 단어 맞추기',
      number: index + 1,
      question,
    })),
    ...koreanToArabicQuestions.map((question, index) => ({
      type: 'k2a',
      sectionTitle: '한국어 단어 맞추기',
      number: index + 6,
      question,
    })),
    ...wordMatchingQuestions.map((question, index) => ({
      type: 'wordMatching',
      sectionTitle: '단어매칭',
      number: index + 11,
      question,
    })),
    ...listeningQuestions.map((question, index) => ({
      type: 'listening',
      sectionTitle: '듣기',
      number: index + 14,
      question,
    })),
    {
      type: 'subjectiveWord',
      sectionTitle: '단어 주관식',
      number: 19,
    },
    {
      type: 'wordCard',
      sectionTitle: '단어카드 매칭',
      number: 24,
    },
    {
      type: 'sentence',
      sectionTitle: '문장테스트',
      number: 25,
      question: sentenceTestQuestions[0],
    },
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [candidateName, setCandidateName] = useState('')
  const [isExamSubmitted, setIsExamSubmitted] = useState(false)

  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [selectedKoreanToArabicAnswers, setSelectedKoreanToArabicAnswers] = useState({})
  const [selectedWordMatchingAnswers, setSelectedWordMatchingAnswers] = useState({})
  const [subjectiveWordAnswers, setSubjectiveWordAnswers] = useState({})
  const [selectedListeningAnswers, setSelectedListeningAnswers] = useState({})
  const [listeningPlayCounts, setListeningPlayCounts] = useState({})
  const [listeningAudioErrors, setListeningAudioErrors] = useState({})
  const [selectedSentenceTestAnswers, setSelectedSentenceTestAnswers] = useState({})
  const [dragCardSlots, setDragCardSlots] = useState(Array(8).fill(null))

  const [shuffledDraggableWordCards] = useState(() => {
    const shuffled = [...draggableWordCards]
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
    }
    return shuffled
  })

  const currentFlowItem = questionFlow[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questionFlow.length - 1
  const progressPercent = ((currentQuestionIndex + 1) / questionFlow.length) * 100

  const normalizeAnswer = (text) => text.replace(/\s+/g, '').trim()
  const hasArabicText = (text) => /[\u0600-\u06FF]/.test(text)
  const renderPromptWithUnderline = (prompt) => {
    return prompt.split(/(아닌|않은)/g).map((part, index) => {
      if (part === '아닌' || part === '않은') {
        return (
          <span key={`${part}-${index}`} className="underline-keyword">
            {part}
          </span>
        )
      }
      return <span key={`text-${index}`}>{part}</span>
    })
  }

  const getDragCardText = (cardId) => {
    return shuffledDraggableWordCards.find((card) => card.id === cardId)?.text ?? ''
  }
  const isWordCardMatchingAllCorrect = () => {
    return wordCardMatchPairs.every((pair, index) => getDragCardText(dragCardSlots[index]) === pair.left)
  }

  const arabicToKoreanScore = arabicToKoreanQuestions.reduce((count, question) => {
    return selectedAnswers[question.id] === question.answer ? count + 1 : count
  }, 0)
  const koreanToArabicScore = koreanToArabicQuestions.reduce((count, question) => {
    return selectedKoreanToArabicAnswers[question.id] === question.answer ? count + 1 : count
  }, 0)
  const wordMatchingScore = wordMatchingQuestions.reduce((count, question) => {
    return selectedWordMatchingAnswers[question.id] === question.answer ? count + 1 : count
  }, 0)
  const listeningScore = listeningQuestions.reduce((count, question) => {
    return selectedListeningAnswers[question.id] === question.answer ? count + 1 : count
  }, 0)
  const subjectiveWordScore = subjectiveWordQuestions.reduce((count, question) => {
    const userAnswer = normalizeAnswer(subjectiveWordAnswers[question.id] || '')
    const isCorrect = question.answers.some((answer) => normalizeAnswer(answer) === userAnswer)
    return isCorrect ? count + 1 : count
  }, 0)
  const wordCardScore = isWordCardMatchingAllCorrect() ? 1 : 0
  const sentenceTestScore = sentenceTestQuestions.reduce((count, question) => {
    return selectedSentenceTestAnswers[question.id] === question.answer ? count + 1 : count
  }, 0)

  const sectionScores = [
    { title: '아한3지선다', score: arabicToKoreanScore, total: 5 },
    { title: '한아3지선다', score: koreanToArabicScore, total: 5 },
    { title: '단어매칭', score: wordMatchingScore, total: 3 },
    { title: '듣기', score: listeningScore, total: 5 },
    { title: '단어 주관식', score: subjectiveWordScore, total: 5 },
    { title: '단어카드 매칭', score: wordCardScore, total: 1 },
    { title: '문장테스트', score: sentenceTestScore, total: 1 },
  ]
  const totalScore = sectionScores.reduce((sum, section) => sum + section.score, 0)
  const totalQuestionCount = 25
  const displayName = candidateName.trim() || '수험자'

  const getDragPayload = (event) => {
    const payload = event.dataTransfer.getData('text/plain')
    if (!payload) {
      return null
    }
    try {
      return JSON.parse(payload)
    } catch {
      return null
    }
  }

  const handleCardDragStart = (event, cardId, sourceSlotIndex = null) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', JSON.stringify({ cardId, sourceSlotIndex }))
  }

  const handleDropToSlot = (event, targetSlotIndex) => {
    event.preventDefault()
    const payload = getDragPayload(event)
    if (!payload?.cardId) {
      return
    }

    const sourceRaw = payload.sourceSlotIndex
    const sourceSlotIndex =
      sourceRaw === null || sourceRaw === undefined || sourceRaw === ''
        ? null
        : Number.isNaN(Number(sourceRaw))
          ? null
          : Number(sourceRaw)

    setDragCardSlots((prev) => {
      const next = [...prev]
      const targetCardId = next[targetSlotIndex]

      if (sourceSlotIndex !== null) {
        next[sourceSlotIndex] = null
      }
      if (sourceSlotIndex !== null && targetCardId) {
        next[sourceSlotIndex] = targetCardId
      }
      next[targetSlotIndex] = payload.cardId
      return next
    })
  }

  const handleDropToCardPool = (event) => {
    event.preventDefault()
    const payload = getDragPayload(event)
    if (!payload?.cardId) {
      return
    }

    const sourceRaw = payload.sourceSlotIndex
    const sourceSlotIndex =
      sourceRaw === null || sourceRaw === undefined || sourceRaw === ''
        ? null
        : Number.isNaN(Number(sourceRaw))
          ? null
          : Number(sourceRaw)

    if (sourceSlotIndex === null) {
      return
    }

    setDragCardSlots((prev) => {
      const next = [...prev]
      next[sourceSlotIndex] = null
      return next
    })
  }

  const handleListeningPlay = (question) => {
    const playedCount = listeningPlayCounts[question.id] || 0
    if (playedCount >= 3) {
      return
    }

    setListeningPlayCounts((prev) => ({ ...prev, [question.id]: playedCount + 1 }))
    setListeningAudioErrors((prev) => ({ ...prev, [question.id]: '' }))

    const audio = new Audio(question.audioUrl)
    audio.play().catch(() => {
      setListeningAudioErrors((prev) => ({
        ...prev,
        [question.id]: '오디오 재생에 실패했습니다. URL을 확인해주세요.',
      }))
    })
  }

  const assignedDragCardIds = new Set(dragCardSlots.filter(Boolean))
  const remainingDragCards = shuffledDraggableWordCards.filter((card) => !assignedDragCardIds.has(card.id))

  const handlePrev = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
  }
  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionFlow.length - 1))
  }
  const handleSubmitExam = () => {
    setIsExamSubmitted(true)
  }
  const handleStartExam = () => {
    if (!candidateName.trim()) {
      return
    }
    setIsExamStarted(true)
  }

  const renderCurrentQuestion = () => {
    if (currentFlowItem.type === 'a2k') {
      const question = currentFlowItem.question
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            <section key={question.id} className="question-item">
              <h3>{currentFlowItem.number}. 다음 단어의 한국어 뜻으로 알맞은 것을 고르시오.</h3>
              <p className="question-word">{question.prompt}</p>
              <div className="options">
                {question.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`option-button ${
                      selectedAnswers[question.id] === option ? 'selected' : ''
                    } ${hasArabicText(option) ? 'arabic-option' : ''}`}
                    onClick={() => setSelectedAnswers((prev) => ({ ...prev, [question.id]: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </article>
      )
    }

    if (currentFlowItem.type === 'k2a') {
      const question = currentFlowItem.question
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            <section key={question.id} className="question-item">
              <h3>{currentFlowItem.number}. 다음 단어의 아랍어 뜻으로 알맞은 것을 고르시오.</h3>
              <p className="question-word">{question.prompt}</p>
              <div className="options">
                {question.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`option-button ${
                      selectedKoreanToArabicAnswers[question.id] === option ? 'selected' : ''
                    } ${hasArabicText(option) ? 'arabic-option' : ''}`}
                    onClick={() =>
                      setSelectedKoreanToArabicAnswers((prev) => ({
                        ...prev,
                        [question.id]: option,
                      }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </article>
      )
    }

    if (currentFlowItem.type === 'wordMatching') {
      const question = currentFlowItem.question
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            <section key={question.id} className="question-item">
              <h3>{renderPromptWithUnderline(question.prompt)}</h3>
              {question.word && <p className="question-word">{question.word}</p>}
              <div className="options">
                {question.options.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className={`option-button ${
                      selectedWordMatchingAnswers[question.id] === option.id ? 'selected' : ''
                    } ${hasArabicText(option.text) ? 'arabic-option' : ''}`}
                    onClick={() =>
                      setSelectedWordMatchingAnswers((prev) => ({ ...prev, [question.id]: option.id }))
                    }
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </article>
      )
    }

    if (currentFlowItem.type === 'listening') {
      const question = currentFlowItem.question
      const playedCount = listeningPlayCounts[question.id] || 0
      const remainCount = Math.max(3 - playedCount, 0)
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            <section key={question.id} className="question-item">
              <h3>{currentFlowItem.number}. 다음 문장을 듣고 알맞은 문장을 고르시오.</h3>
              <button
                type="button"
                className="speaker-button"
                onClick={() => handleListeningPlay(question)}
                disabled={playedCount >= 3}
              >
                🔊 문장 듣기 ({playedCount}/3)
              </button>
              <p className="listen-meta">남은 재생 횟수: {remainCount}회</p>
              {listeningAudioErrors[question.id] && (
                <p className="result-text wrong">{listeningAudioErrors[question.id]}</p>
              )}
              <div className="options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`option-button ${
                      selectedListeningAnswers[question.id] === option ? 'selected' : ''
                    } ${hasArabicText(option) ? 'arabic-option' : ''}`}
                    onClick={() =>
                      setSelectedListeningAnswers((prev) => ({ ...prev, [question.id]: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </article>
      )
    }

    if (currentFlowItem.type === 'subjectiveWord') {
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            {subjectiveWordQuestions.map((question) => (
              <section key={question.id} className="question-item">
                <h3>{question.prompt}</h3>
                <p className="question-word">{question.word}</p>
                <input
                  type="text"
                  className="subjective-input"
                  placeholder="정답을 입력하세요"
                  value={subjectiveWordAnswers[question.id] || ''}
                  onChange={(event) =>
                    setSubjectiveWordAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))
                  }
                />
              </section>
            ))}
          </div>
        </article>
      )
    }

    if (currentFlowItem.type === 'wordCard') {
      return (
        <article className="test-card test-card-wide">
          <h2>단어카드 매칭</h2>
          <p className="card-description">
            24. 아래 카드 배열을 보고, 숫자에 맞춰 알맞은 아랍어 단어를 드래그하세요.
          </p>
          <section className="card-matching-reference-wrap">
            <div className="reference-card-grid">
              {wordCardMatchPairs.map((pair, index) => (
                <div key={pair.id} className="reference-word-card">
                  <div className="slot-index-label">{index + 1}</div>
                  <div className="reference-korean">{pair.right}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="card-matching-drag-wrap">
            <div className="drop-zone-grid">
              {dragCardSlots.map((cardId, index) => (
                <div
                  key={`drop-${index + 1}`}
                  className="drag-slot-card"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDropToSlot(event, index)}
                >
                  <div className="slot-index-label">슬롯 {index + 1}</div>
                  {cardId ? (
                    <div
                      className="draggable-card-content"
                      draggable
                      onDragStart={(event) => handleCardDragStart(event, cardId, index)}
                    >
                      {getDragCardText(cardId)}
                    </div>
                  ) : (
                    <div className="draggable-card-placeholder">여기로 드래그</div>
                  )}
                </div>
              ))}
            </div>
            <div
              className="drag-card-pool"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDropToCardPool}
            >
              {remainingDragCards.map((card) => (
                <div
                  key={card.id}
                  className="draggable-card-content"
                  draggable
                  onDragStart={(event) => handleCardDragStart(event, card.id)}
                >
                  {card.text}
                </div>
              ))}
            </div>
          </section>
        </article>
      )
    }

    if (currentFlowItem.type === 'sentence') {
      const question = currentFlowItem.question
      return (
        <article className="test-card test-card-wide">
          <div className="question-list">
            <section key={question.id} className="question-item">
              <h3>{question.prompt}</h3>
              <p className="reading-passage">{question.passage.join('\n')}</p>
              <div className="options">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-button ${
                      selectedSentenceTestAnswers[question.id] === option.id ? 'selected' : ''
                    } ${hasArabicText(option.text) ? 'arabic-option' : ''}`}
                    onClick={() =>
                      setSelectedSentenceTestAnswers((prev) => ({ ...prev, [question.id]: option.id }))
                    }
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </article>
      )
    }

    return null
  }

  if (!isExamStarted) {
    return (
      <div className="lesson-app">
        <header className="lesson-header">
          <h1>2과 테스트</h1>
        </header>
        <main className="exam-main">
          <article className="test-card test-card-wide">
            <h2>시험 시작</h2>
            <p className="card-description">시험자의 이름을 입력한 후 시작하세요.</p>
            <input
              type="text"
              className="subjective-input"
              placeholder="이름을 입력하세요"
              value={candidateName}
              onChange={(event) => setCandidateName(event.target.value)}
            />
            <div className="section-navigation">
              <button
                type="button"
                className="nav-button"
                onClick={handleStartExam}
                disabled={!candidateName.trim()}
              >
                시험 시작
              </button>
            </div>
          </article>
        </main>
      </div>
    )
  }

  if (isExamSubmitted) {
    return (
      <div className="lesson-app">
        <header className="lesson-header">
          <h1>2과 테스트 결과</h1>
        </header>
        <main className="exam-main">
          <article className="test-card test-card-wide">
            <p className="card-description">{displayName}님의 시험 결과입니다.</p>
            <h2>최종 점수</h2>
            <p className="score-text">
              총점: {totalScore} / {totalQuestionCount}
            </p>
            <p className="card-description">
              정답률: {Math.round((totalScore / totalQuestionCount) * 100)}%
            </p>
            <div className="result-grid">
              {sectionScores.map((section) => (
                <div key={section.title} className="result-row">
                  <span>{section.title}</span>
                  <span>
                    {section.score} / {section.total}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </main>
      </div>
    )
  }

  return (
    <div className="lesson-app">
      <header className="lesson-header">
        <h1>2과 테스트</h1>
        <p className="section-meta">
          단계 {currentQuestionIndex + 1} / {questionFlow.length} - {currentFlowItem.sectionTitle}
        </p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </header>
      <main className="exam-main">
        {renderCurrentQuestion()}
        <div className="section-navigation">
          <button
            type="button"
            className="nav-button secondary"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            이전
          </button>
          {isLastQuestion ? (
            <button type="button" className="nav-button" onClick={handleSubmitExam}>
              25문항 전체 채점하기
            </button>
          ) : (
            <button type="button" className="nav-button" onClick={handleNext}>
              다음
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
