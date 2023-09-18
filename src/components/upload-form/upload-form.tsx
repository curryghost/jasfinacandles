import { useRef } from "preact/hooks";
import { signal } from "@preact/signals";

const fileUrl = signal<string | null>(null);

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const file = formData.get("pic") as File;
    if (!file) return;
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        inputRef.current!.value = "";
        fileUrl.value = null;
      })
      .catch((err) => console.error(err));
  };

  const handleInput = () => {
    if (inputRef.current?.value) {
      fileUrl.value = URL.createObjectURL(inputRef.current.files![0]);
    } else {
      URL.revokeObjectURL(fileUrl.value!);
      fileUrl.value = null;
    }
  };

  return (
    <>
      <div class="h-52 w-52">
        {fileUrl.value && (
          <img
            class="h-full w-full object-cover"
            src={fileUrl.value}
            alt="preview"
          />
        )}
      </div>
      <form class="mt-5 flex gap-5" ref={formRef}>
        <label
          class="cursor-pointer rounded-full bg-accent px-4 py-2 text-xs font-bold text-dark shadow-sm"
          for="pic"
        >
          Choose a file
        </label>
        <input
          ref={inputRef}
          onChange={handleInput}
          id="pic"
          name="pic"
          type="file"
          hidden
          required
        />
        <button
          onClick={(e) => handleSubmit(e)}
          class="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-dark shadow-sm"
          type="submit"
        >
          Upload
        </button>
      </form>
    </>
  );
}
