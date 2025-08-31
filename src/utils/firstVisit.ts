export function isFirstVisit() {
  const firstVisitKey = 'first_visit'
  const visitedKey = 'visited'

  // 检查是否有visited标记
  if (localStorage.getItem(visitedKey)) {
    return false
  }

  // 如果没有visited标记，但有firstVisit标记（可能是之前的访问）
  if (localStorage.getItem(firstVisitKey)) {
    // 更新为visited标记
    localStorage.setItem(visitedKey, 'true')
    localStorage.removeItem(firstVisitKey)
    return false
  }

  // 首次访问
  localStorage.setItem(firstVisitKey, new Date().toISOString())
  return true
}

export function setVisited() {
  const visitedKey = 'visited'
  localStorage.setItem(visitedKey, 'true')
}
