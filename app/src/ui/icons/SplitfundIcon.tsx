export const SplitfundIcon = ({ className, theme = "light" }: { className?: string; theme?: "light" | "dark" }) => (
  <>
    {theme === "light" && (
      <svg className={className} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 71">
        <path d="M40.17,21.62h5.84l-14.19,25.76h-5.84l14.19-25.76Z" fill="#080d55" />
        <circle cx="36" cy="35.5" r="33.5" fill="none" stroke="#080d55" strokeMiterlimit="10" strokeWidth="3" />
      </svg>
    )}
  </>
);
