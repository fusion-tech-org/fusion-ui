import { Anchor } from '@arco-design/web-react';
import { useEffect } from 'react';
const AnchorLink = Anchor.Link;

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      // 如果观察目标在视口内，则添加“active”类
      entry.target.classList.add('active');
    } else {
      // 否则移除“active”类
      entry.target.classList.remove('active');
    }
  });
});

export const TabulatorEmpty = () => {
  const elems = document.querySelectorAll('.my-anchor');

  useEffect(() => {
    if (elems?.length) {
      elems.forEach((el) => {
        io.observe(el);
      });
    }
  }, [elems?.length]);
  return (
    <div style={{ display: 'flex', padding: '32px' }}>
      <div className="w-48 bg-[#f6f9f9]">
        <Anchor>
          <AnchorLink href="#id_1" title="Basic" />
          <AnchorLink href="#id_2" title="Static" />
          <AnchorLink href="#id_3" title="Lineless mode" />
          <AnchorLink href="#id_4" title="Affix" />
          <AnchorLink href="#id_5" title="Scroll boundary" />
          <AnchorLink href="#id_6" title="Hash mode" />
        </Anchor>
      </div>
      <div>
        <div className="h-[360px] bg-[#f66]">
          <a id="id_1" className="my-anchor">
            1
          </a>
        </div>

        <div className="h-[360px]">
          <a id="id_2" className="my-anchor">
            2
          </a>
        </div>

        <div className="h-[360px] bg-[#f66]">
          <a id="id_3" className="my-anchor">
            3
          </a>
        </div>

        <div className="h-[360px]">
          <a id="id_4" className="my-anchor">
            4
          </a>
        </div>

        <div className="h-[360px] bg-[#f66]">
          <a id="id_5" className="my-anchor">
            5
          </a>
        </div>

        <div className="h-[360px]">
          <a id="id_6" className="my-anchor">
            6
          </a>
        </div>
      </div>
    </div>
  );
};
