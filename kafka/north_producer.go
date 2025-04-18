package kafka

import (
	"fmt"
	"log"

	"github.com/IBM/sarama"
)

type NorthProducer struct {
	producer sarama.SyncProducer
}

func NewNorthProducer(brokers []string) (*NorthProducer, error) {
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForAll
	config.Producer.Retry.Max = 5
	config.Producer.Return.Successes = true

	producer, err := sarama.NewSyncProducer(brokers, config)
	if err != nil {
		return nil, fmt.Errorf("failed to start North Kafka producer: %w", err)
	}

	return &NorthProducer{producer: producer}, nil
}

func (p *NorthProducer) SendMessage(topic, message string) error {
	log.Printf("Producer received message: %s", message)
	msg := &sarama.ProducerMessage{
		Topic: topic,
		Value: sarama.StringEncoder(message),
	}
	_, _, err := p.producer.SendMessage(msg)
	if err != nil {
		log.Printf("Failed to send message to topic %s: %v", topic, err)
		return err
	}
	log.Printf("Message sent to topic %s in North region", topic)
	return nil
}
