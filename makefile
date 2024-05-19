.PHONY: clean generate migrate

clean:
	rm -rf .wrangler/state/v3/d1 migrations

generate:
	npm run db:generate

migrate:
	npm run db:migrate:local

db-flush: clean generate migrate

seed-db:
	npm run db:seed

seed-images:
	npm run db:seed:images:local

studio:
	npm run db:studio

post-seed-request:
	@ls -1 ./seed/images | tr '\n' ',' | xargs -I {} sh -c 'curl -H "Content-Type: application/json" -d "{\"seedImages\": \"{}\"}" http://localhost:8787'