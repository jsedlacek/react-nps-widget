BIN = node_modules/.bin

all: node_modules
	($(MAKE) watch &); ($(MAKE) serve)

node_modules: package.json
	npm i

watch:
	$(BIN)/jsx --watch src/ build/

serve:
	$(BIN)/serve

clean:
	rm -rf build node_modules
