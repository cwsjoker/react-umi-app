export const exportComponentAsPNG = async (element: HTMLElement | null, name?: string, onSuccess?: () => void) => {
  if (!element) return;
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(element, {
    useCORS: true, // 【重要】开启跨域配置
    allowTaint: true, // 允许跨域图片
    scale: 2, // 处理模糊问题
    backgroundColor: 'transparent',
  });
  const imageData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${name}.png`;
  link.href = imageData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  onSuccess?.();
};

// 修复html2canvas文字一直置底不垂直居中的问题，flex居中、line-height居中和设置margin居中不生效，github的解决方法是把全局img的block改成inline）
// https://github.com/niklasvh/html2canvas/issues/1840
export function fixHtml2canvasTextLineHeight() {
  let styleNode: HTMLStyleElement | null = null;
  styleNode = document.createElement('style');
  styleNode.type = 'text/css';
  styleNode.id = 'imgInline';
  styleNode.innerHTML = `
    img { display: inline; }
  `;
  const head = document.querySelector('head');
  head?.appendChild(styleNode);

  return () => {
    head && styleNode && head.removeChild(styleNode);
  };
}
