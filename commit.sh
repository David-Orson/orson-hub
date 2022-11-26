echo "Please stage all changes you want to commit.
Choose a commit type: 
0) Add file or feature
1) Bug fix 
2) Refactor 
3) Performance improvement
4) Docs or readme
5) Dependencies
6) Security 
7) Config 
8) Removal of files or dead code"

read opt

echo "Please enter a Subject line (keep imperative and less than 50 characters)"

read subj

echo "Please enter a body (Optional)"

read body

echo "Please enter a footer (Otional)"

read footer

case $opt in
	0)
        git commit -m ":heavy_plus_sign: $subj
        
        $body
        $footer
        "
        ;;
	1)
		git commit -m ":hammer: $subj
        
        $body
        $footer
        "
        ;;
    2)
        git commit -m ":repeat: $subj
        
        $body
        $footer
        "
        ;;
    3)
        git commit -m ":zap: $subj
        
        $body
        $footer
        "
        ;;
    4)
        git commit -m ":scroll: $subj
        
        $body
        $footer
        "
        ;;
    5)
        git commit -m ":toolbox: $subj
        
        $body
        $footer
        "
        ;;
    6)
        git commit -m ":lock: $subj
        
        $body
        $footer
        "
        ;;
    7)
        git commit -m ":gear: $subj
        
        $body
        $footer
        "
        ;;
    8)
        git commit -m ":x: $subj
        
        $body
        $footer
        "
        ;;
	*)
		echo "Please choose a valid option"
		;;
esac
