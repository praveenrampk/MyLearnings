rm -rf build
react-scripts build
sleep 2
mkdir -p build/static/css/static
mv build/static/media/ build/static/css/static/media

echo "Build succeeded"