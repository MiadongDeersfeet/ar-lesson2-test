import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
        ' مُحَمَّدٌ طَالِبٌ فِي الجَامِعَةِ، وَبَيْتُ الطَّلَبَةِ قَرِيبٌ مِنَ الجَامِعَةِ',
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
  /** 단어카드 매칭(24번): 한국어·아랍어 순서 무관, 서로 맞는 짝만 제거, 오답 시 종료 */
  const [wordCardMatchedIndices, setWordCardMatchedIndices] = useState(() => new Set())
  const [wordCardFirstPick, setWordCardFirstPick] = useState(null)
  const [wordCardMatchFailed, setWordCardMatchFailed] = useState(false)

  const examScrollRef = useRef(null)

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
  const wordCardScore =
    wordCardMatchedIndices.size === wordCardMatchPairs.length && !wordCardMatchFailed ? 1 : 0
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

  useLayoutEffect(() => {
    if (!isExamStarted || isExamSubmitted) {
      return
    }
    const panel = examScrollRef.current
    if (panel) {
      panel.scrollTop = 0
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [currentQuestionIndex, isExamStarted, isExamSubmitted])

  useEffect(() => {
    const onEnterNavigate = (event) => {
      if (event.key !== 'Enter' || event.repeat) {
        return
      }
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return
      }

      if (!isExamStarted) {
        if (candidateName.trim()) {
          event.preventDefault()
          setIsExamStarted(true)
        }
        return
      }

      if (isExamSubmitted) {
        return
      }

      event.preventDefault()
      if (currentQuestionIndex >= questionFlow.length - 1) {
        setIsExamSubmitted(true)
      } else {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionFlow.length - 1))
      }
    }

    window.addEventListener('keydown', onEnterNavigate)
    return () => window.removeEventListener('keydown', onEnterNavigate)
  }, [
    isExamStarted,
    isExamSubmitted,
    candidateName,
    currentQuestionIndex,
    questionFlow.length,
  ])

  const handleWordCardKoreanClick = (pairIndex) => {
    if (wordCardMatchFailed || wordCardMatchedIndices.has(pairIndex)) {
      return
    }

    if (!wordCardFirstPick) {
      setWordCardFirstPick({ kind: 'korean', index: pairIndex })
      return
    }

    if (wordCardFirstPick.kind === 'korean') {
      if (wordCardFirstPick.index === pairIndex) {
        setWordCardFirstPick(null)
        return
      }
      setWordCardMatchFailed(true)
      return
    }

    const arabicText = wordCardFirstPick.text
    if (wordCardMatchPairs[pairIndex].left === arabicText) {
      setWordCardMatchedIndices((prev) => new Set(prev).add(pairIndex))
      setWordCardFirstPick(null)
    } else {
      setWordCardMatchFailed(true)
    }
  }

  const handleWordCardArabicClick = (arabicText) => {
    if (wordCardMatchFailed) {
      return
    }
    const pairIndexForCard = wordCardMatchPairs.findIndex((p) => p.left === arabicText)
    if (pairIndexForCard === -1 || wordCardMatchedIndices.has(pairIndexForCard)) {
      return
    }

    if (!wordCardFirstPick) {
      setWordCardFirstPick({ kind: 'arabic', text: arabicText })
      return
    }

    if (wordCardFirstPick.kind === 'arabic') {
      if (wordCardFirstPick.text === arabicText) {
        setWordCardFirstPick(null)
        return
      }
      setWordCardMatchFailed(true)
      return
    }

    const koreanIndex = wordCardFirstPick.index
    if (wordCardMatchPairs[koreanIndex].left === arabicText) {
      setWordCardMatchedIndices((prev) => new Set(prev).add(koreanIndex))
      setWordCardFirstPick(null)
    } else {
      setWordCardMatchFailed(true)
    }
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
      const totalPairs = wordCardMatchPairs.length
      const matchedCount = wordCardMatchedIndices.size
      const isComplete = matchedCount >= totalPairs && !wordCardMatchFailed
      const phaseHint =
        wordCardMatchFailed
          ? '오답입니다. 이 단계는 틀린 것으로 처리됩니다.'
          : isComplete
            ? '모든 짝을 맞췄습니다.'
            : !wordCardFirstPick
              ? `(${matchedCount}/${totalPairs}) 한국어와 아랍어 중 카드 하나를 눌러 시작하세요.`
              : wordCardFirstPick.kind === 'korean'
                ? `(${matchedCount}/${totalPairs}) 이어서 짝이 되는 아랍어 카드를 누르세요.`
                : `(${matchedCount}/${totalPairs}) 이어서 짝이 되는 한국어 뜻 카드를 누르세요.`
      return (
        <article className="test-card test-card-wide">
          <h2>단어카드 매칭</h2>
          <p className="card-description">
            24. 한국어 뜻 카드와 아랍어 카드를 누르는 순서는 자유입니다. 서로 짝이 맞으면 두 카드가
            사라지고, 짝이 맞지 않으면 바로 틀린 것으로 끝납니다. 같은 카드를 다시 누르면 선택을 취소할 수
            있습니다.
          </p>
          <p className={`word-card-phase-hint ${wordCardMatchFailed ? 'wrong' : ''}`}>{phaseHint}</p>
          <section className="card-matching-reference-wrap">
            <p className="word-card-section-label">한국어 뜻</p>
            <div className="reference-card-grid">
              {wordCardMatchPairs.map((pair, index) => {
                if (wordCardMatchedIndices.has(index)) {
                  return <div key={pair.id} className="reference-word-card reference-word-card--cleared" />
                }
                const isSelected =
                  wordCardFirstPick?.kind === 'korean' && wordCardFirstPick.index === index
                return (
                  <button
                    key={pair.id}
                    type="button"
                    className={`reference-word-card reference-word-card--tap${isSelected ? ' reference-word-card--selected' : ''}`}
                    onClick={() => handleWordCardKoreanClick(index)}
                    disabled={wordCardMatchFailed}
                  >
                    <div className="reference-korean">{pair.right}</div>
                  </button>
                )
              })}
            </div>
          </section>
          <section className="card-matching-drag-wrap">
            <p className="word-card-section-label">아랍어 단어</p>
            <div className="drag-card-pool drag-card-pool--tap">
              {shuffledDraggableWordCards.map((card) => {
                const idx = wordCardMatchPairs.findIndex((p) => p.left === card.text)
                const cleared = idx !== -1 && wordCardMatchedIndices.has(idx)
                if (cleared) {
                  return (
                    <div key={card.id} className="arabic-card-cell arabic-card-cell--cleared" aria-hidden />
                  )
                }
                const isSelected =
                  wordCardFirstPick?.kind === 'arabic' && wordCardFirstPick.text === card.text
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`draggable-card-content draggable-card-content--tap${
                      isSelected ? ' draggable-card-content--selected' : ''
                    }`}
                    onClick={() => handleWordCardArabicClick(card.text)}
                    disabled={wordCardMatchFailed}
                  >
                    {card.text}
                  </button>
                )
              })}
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
      <div className="lesson-app lesson-app--splash">
        <header className="lesson-header lesson-header--splash">
          <h1>2과 테스트</h1>
        </header>
        <main className="exam-main exam-main--splash">
          <article className="test-card test-card-wide splash-card">
            <h2>시험 시작</h2>
            <p className="card-description">시험자의 이름을 입력한 후 시작하세요.</p>
            <input
              type="text"
              className="subjective-input"
              placeholder="이름을 입력하세요"
              value={candidateName}
              onChange={(event) => setCandidateName(event.target.value)}
            />
            <div className="section-navigation section-navigation--solo">
              <button
                type="button"
                className="nav-button nav-button--primary"
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
      <div className="lesson-app lesson-app--results">
        <header className="lesson-header lesson-header--splash">
          <h1>2과 테스트 결과</h1>
        </header>
        <main className="exam-main exam-main--splash">
          <article className="test-card test-card-wide results-card">
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
    <div className="lesson-app lesson-app--exam">
      <header className="lesson-header lesson-header--exam">
        <div className="lesson-header-inner">
          <h1>2과 테스트</h1>
          <p className="section-meta">
            단계 {currentQuestionIndex + 1} / {questionFlow.length}
            <span className="section-meta-divider">·</span>
            <span className="section-meta-title">{currentFlowItem.sectionTitle}</span>
          </p>
          <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </header>
      <main ref={examScrollRef} className="exam-main exam-main--session">
        {renderCurrentQuestion()}
      </main>
      <footer className="exam-footer">
        <div className="section-navigation">
          <button
            type="button"
            className="nav-button nav-button--secondary"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            이전
          </button>
          {isLastQuestion ? (
            <button type="button" className="nav-button nav-button--primary" onClick={handleSubmitExam}>
              25문항 전체 채점하기
            </button>
          ) : (
            <button type="button" className="nav-button nav-button--primary" onClick={handleNext}>
              다음
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
