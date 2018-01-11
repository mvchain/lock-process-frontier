/**
 * Created by 宁建浩 on 18/1/6.
 */

/* 手机号*/
export function phoneNumFilter(p) {
  const reg = /^1[0-9]{10}$/
  if (reg.test(p)) {
    return true
  } else {
    return false
  }
}

/* 密码*/
export function passwordVerification(v) {
  const reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/
  if (reg.test(v)) {
    return true;
  } else {
    return false;
  }
}
/*正数*/
export function balanceVerification(v) {
  const reg = /^[0-9]+\.?[0-9]{0,9}$/
  if (reg.test(v)) {
    return true;
  } else {
    return false;
  }
}
