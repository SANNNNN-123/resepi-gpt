const Header = () => {
  return (
    <div className="text-center mb-4">
      <h1 className="max-w-2xl mx-auto tracking-tight mb-4">
        <div className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          Masak Senang
          <br />
          dengan {' '}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text text-transparent">
            Resepi GPT
          </span>
        </div>
        <div className="text-center text-lg text-muted-foreground mt-2">Percuma. Sumber Terbuka. Penjana Resepi Masakan Melayu.</div> 
      </h1>
    </div>
  )
}

export default Header

