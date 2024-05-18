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
	npm run db:seed:images

studio:
	npm run db:studio