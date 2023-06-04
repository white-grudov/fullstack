import React, { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>Votes: {votes}</p>
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const mostVotedIndex = votes.indexOf(Math.max(...votes))
  const mostVotedAnecdote = anecdotes[mostVotedIndex]

  if (votes[mostVotedIndex] === 0) {
    return null
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={mostVotedAnecdote} votes={votes[mostVotedIndex]} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the Day</h2>
        <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
        <Button text="Vote" onClick={voteAnecdote} />
        <Button text="Next Anecdote" onClick={randomAnecdote} />
      </div>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
