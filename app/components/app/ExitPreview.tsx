export const ExitPreview = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center w-screen h-screen pointer-events-none">
      <form className="pointer-events-auto" action="/resource/preview" method="POST">
        <button className="p-4 font-bold text-white bg-black" type="submit">
          Exit Preview Mode
        </button>
      </form>
    </div>
  )
}
