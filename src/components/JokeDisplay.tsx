import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Button } from 'antd';
interface JokeState {
  joke: string;
  loading: boolean;
  error: string | null;
}

function JokeDisplay() {
  const [state, setState] = useState<JokeState>({
    joke: '',
    loading: true,
    error: null,
  });

  const fetchJoke = async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setState(prevState => ({ ...prevState, joke: data.joke, loading: false })); 
    } catch (e: any) { 
      setState(prevState => ({
        ...prevState,
        error: '농담을 가져오는 데 실패했습니다: ' + e.message,
        loading: false
      }));
      console.error("Fetching joke failed:", e);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []); 

  return (
    <div className="joke-display-container">
      <h5>오늘의 영어 유머</h5>
      {state.loading && <p>농담을 불러오는 중...</p>}
      {state.error && <p className="error-message">{state.error}</p>}
      {!state.loading && !state.error && <p className="joke-text">"{state.joke}"</p>}
      <Button onClick={fetchJoke} disabled={state.loading}  type="primary">
        다른 농담 보기
      </Button>
    </div>
  );
}

export default JokeDisplay;