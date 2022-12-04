file=day$1.ts

if [[ -n $1 ]]; then
    node src/$file 
else
    echo "You should specify a day number"
    exit 1
fi

