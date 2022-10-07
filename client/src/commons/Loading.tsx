const Loading: React.FC = () => {
  return (
    <div className="spinner-grow text-secondary" style={{ width: "6rem", height: "6rem" }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export { Loading }
