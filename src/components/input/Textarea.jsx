function Textarea() {
  return (
    <div className="flex flex-col">
      <label className="flex-shrink-0 text-base">*text：</label>
      <textarea
        type="text"
        id="messageInput"
        className="w-full mx-auto py-1.5 px-2.5 resize-none border rounded max-h-40"
        maxLength={50}
        rows={5}
        placeholder="Type your message here..."
      />
    </div>
  );
}

export default Textarea;