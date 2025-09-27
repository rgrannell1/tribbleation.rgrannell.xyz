/*
 * Read a file and return its content as a string
 *
 * @param file The file to read
 * @returns A promise that resolves to the file content as a string
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      resolve(content);
    };
    reader.readAsText(file);
  });
}
