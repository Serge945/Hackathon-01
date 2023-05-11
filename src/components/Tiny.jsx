import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Tiny() {
  const editorRef = useRef(null);

  return (
    <div>
      <Editor
        apiKey='or6qkdl4otamaqlkd9hrx045bfc0f8ifqr4eujtsfti2edrf'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Tape your Trip here</p>"
        init={{
          height: 250,
          menubar: false,
          color: 'dark',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
}