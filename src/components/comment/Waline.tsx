import { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/style';

export function Waline({ serverURL }: { serverURL: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const walineRef = useRef<any>(null); // 存储Waline实例

  useEffect(() => {
    // 确保DOM已挂载
    if (!ref.current) return;
    
    walineRef.current = init({
      el: ref.current,
      serverURL,
      dark: "[data-theme='dark']",
      meta: ['nick', 'mail', 'link'],
      login: 'enable', 
      pageview: true,
      imageUploader: false,
      reaction: true,
      search: true,
      locale: {
        placeholder: '发条友善的评论吧（支持 Markdown 语法）…',
        nick: '昵称 (必填)',
        mail: '邮箱 (必填)',
      },
      emoji: [
        'https://unpkg.com/@waline/emojis@1.2.0/qq',
        'https://unpkg.com/@waline/emojis@1.2.0/tieba',
        'https://unpkg.com/@waline/emojis@1.2.0/bilibili'
      ],
    });

    return () => {
      // 组件卸载时销毁Waline实例
      walineRef.current?.destroy();
      walineRef.current = null;
    };
  }, [serverURL]);

  return <div ref={ref} className="waline-container" />;
}
