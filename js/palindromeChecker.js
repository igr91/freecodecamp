function palindrome(str) {
  let filteredStrArray = str.toLowerCase().match(/[a-z0-9]/g);
  let reverseStrArray = [...filteredStrArray].reverse();

  let filteredStr = filteredStrArray.join("");
  let reverseStr = reverseStrArray.join("");

  if (!(filteredStr === reverseStr)) {
    return false;
  } else {
    return true;
  }
}

palindrome("eye");
palindrome("race car");
palindrome("A man, a plan, a canal. Panama");
palindrome("nope");
