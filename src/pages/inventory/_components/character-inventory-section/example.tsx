import { Link } from 'react-router-dom';

export const CharacterInventorySectionExample = () => {
  return (
    <section>
      <p className="font-semibold pb-4">캐릭터</p>
      <EmptyCharacterMessage />
    </section>
  );
};

const EmptyCharacterMessage = () => {
  return (
    <div className="flex-center flex-col py-4 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-lock"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      </svg>
      <p className="text-sm">
        <Link to="/auth/login" className="text-blue-600">
          로그인
        </Link>
        이 필요하닭!
      </p>
    </div>
  );
};
