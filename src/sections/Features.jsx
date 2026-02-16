const Features = () => {
  return (
    <section className="relative min-h-screen pt-20 flex flex-col overflow-hidden px-6">
      <div className="relative flex items-center justify-center">
        {/* Stacked cards effect - bottom to top */}
        <div className="absolute w-[10rem] h-[10rem] left-0 top-[-0.5rem] bg-brand-text/80 rounded-xl z-10"></div>
        <div className="absolute w-[10rem] h-[10rem] left-4 top-[0.25rem] bg-brand-text/90 rounded-xl z-20"></div>
        <div className="absolute w-[10rem] h-[10rem] left-8 top-[1rem] bg-brand-text rounded-xl z-30"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl min-[1150px]:text-[5rem] xl:text-7xl font-dela leading-[1.1] mb-6 tracking-tight text-center">
          From chaos to clarity
        </h1>
      </div>
    </section>
  )
}

export default Features
