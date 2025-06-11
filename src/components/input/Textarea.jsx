function Textarea() {
  return (
    <div className='flex flex-col'>
      <label className='flex-shrink-0 text-base'>*text：</label>
      <textarea
        type='text'
        id='messageInput'
        className='mx-auto max-h-40 w-full resize-none rounded border px-2.5 py-1.5'
        maxLength={50}
        rows={5}
        placeholder='Type your message here...'
      />
    </div>
  );
}

export default Textarea;
