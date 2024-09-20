const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default async function autoTyper() {
  await exec(`osascript -e '
  on run
  
  tell application "System Events"
	  set clipboardContent to (the clipboard) as text
	  set lineList to paragraphs of clipboardContent -- Split the clipboard content into lines
	  repeat with lineToType in lineList
		  set trimmedLine to do shell script "echo " & quoted form of lineToType & " | sed 's/^[[:space:]]*//'" -- Remove the leading whitespace using a shell command
		  repeat with charToType in characters of trimmedLine -- Loop through each character of the trimmed line
			  keystroke charToType -- Type the character
		  end repeat
		  keystroke return -- Press enter
	  end repeat
  end tell
end run
    '`);
}
