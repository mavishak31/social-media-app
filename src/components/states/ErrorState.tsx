export function ErrorState({ text }: { text: string }) {
  return (
    <div className='rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300'>
      {text}
    </div>
  );
}
