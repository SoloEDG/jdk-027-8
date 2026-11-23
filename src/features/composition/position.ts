// 画布位置约束：键盘微调与鼠标拖动共用同一套边界规则（百分比坐标）
export const POSITION_MIN = 6;
export const POSITION_MAX = 94;

// 键盘微调步长：默认 1%，按住 Shift 使用更大步长
export const NUDGE_STEP = 1;
export const NUDGE_STEP_LARGE = 5;

// 复制图层时的位置偏移，让副本与原层错开可见
export const DUPLICATE_OFFSET = 4;

export const clampPosition = (value: number) => Math.min(POSITION_MAX, Math.max(POSITION_MIN, value));

// 副本落点：优先向 +offset 方向错开，越界则反向，始终保持在画布限制内
export const offsetPosition = (value: number) => {
  const shifted = value + DUPLICATE_OFFSET;
  return shifted <= POSITION_MAX ? shifted : clampPosition(value - DUPLICATE_OFFSET);
};
