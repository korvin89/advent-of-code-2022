file=day$1.js

# if [ ! -d "build" ]; then
#     npm run build
# fi

npm run build

if [[ -n $1 ]]; then
    node build/$file 
else
    echo "You should specify a day number"
    exit 1
fi

