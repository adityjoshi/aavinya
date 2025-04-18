package database

import (
	"context"
	"log"

	"github.com/go-redis/redis/v8"
)

var RedisClient *redis.Client
var Ctx = context.Background()

func InitializeRedisClient() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "redis-cache:6379",
		Password: "",
		DB:       0,
	})

	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Fatalf("Redis is not connected: %v", err)
	}
}

func GetRedisClient() *redis.Client {
	if RedisClient == nil {
		InitializeRedisClient()
	}
	return RedisClient
}
