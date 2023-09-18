import { signal } from "@preact/signals";
import type { Ref } from "preact";
import { useEffect } from "preact/hooks";

const file = signal<string | null>(null);
export default function Preview({ inputRef }: { inputRef: HTMLInputElement }) {
  const handleFileChange = () => {
    if (inputRef!.current.value) {
      file.value = URL.createObjectURL(inputRef!.files![0]);
    } else {
      URL.revokeObjectURL(file.value!);
      file.value = null;
    }
    console.log(file.value);
  };

  useEffect(() => {
    inputRef.addEventListener("change", handleFileChange);
    return () => {
      inputRef.removeEventListener("change", handleFileChange);
    };
  }, []);

  return (
    <div class="h-52 w-52">
      {file.value && (
        <img
          class="h-full w-full object-cover"
          src={file.value}
          alt="preview"
        />
      )}
    </div>
  );
}
