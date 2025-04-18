package kafkamanager

import (
	"fmt"
	"log"

	"github.com/adityjoshi/aavinya/kafka"
)

type KafkaManager struct {
	northProducer *kafka.NorthProducer
	southProducer *kafka.SouthProducer
}

func NewKafkaManager(northBrokers, southBrokers []string) (*KafkaManager, error) {
	northProducer, err := kafka.NewNorthProducer(northBrokers)
	if err != nil {
		return nil, fmt.Errorf("error initializing North producer: %w", err)
	}

	southProducer, err := kafka.NewSouthProducer(southBrokers)
	if err != nil {
		return nil, fmt.Errorf("error initializing North producer: %w", err)
	}

	return &KafkaManager{
		northProducer: northProducer,
		southProducer: southProducer,
	}, nil
}

func (km *KafkaManager) SendUserRegistrationMessage(region, topic, message string) error {
	var err error

	switch region {
	case "north":

		log.Printf("Sending message to North region, topic: %s", topic)
		err = km.northProducer.SendMessage(topic, message)
	case "south":
		log.Printf("Sending message to South region, topic: %s", topic)
		err = km.southProducer.SendMessage(topic, message)
	default:

		return fmt.Errorf("invalid region: %s", region)
	}

	if err != nil {
		return fmt.Errorf("failed to send message to Kafka topic %s in %s region: %w", topic, region, err)
	}

	log.Printf("Message successfully sent to topic %s in %s region", topic, region)
	return nil
}

func (km *KafkaManager) SendHospitalRegistrationMessage(region, topic, message string) error {
	var err error

	switch region {
	case "north":

		log.Printf("Sending message to North region, topic: %s", topic)
		err = km.northProducer.SendMessage(topic, message)
	case "south":

		log.Printf("Sending message to South region, topic: %s", topic)
		err = km.southProducer.SendMessage(topic, message)
	default:

		return fmt.Errorf("invalid region: %s", region)
	}

	if err != nil {
		return fmt.Errorf("failed to send message to Kafka topic %s in %s region: %w", topic, region, err)
	}

	log.Printf("Message successfully sent to topic %s in %s region", topic, region)
	return nil
}

func (km *KafkaManager) SendHospitalStaffRegisterMessage(region, topic, message string) error {
	var err error

	switch region {
	case "north":

		log.Printf("Sending message to North region, topic: %s", topic)
		err = km.northProducer.SendMessage(topic, message)
	case "south":

		log.Printf("Sending message to South region, topic: %s", topic)
		err = km.southProducer.SendMessage(topic, message)
	default:

		return fmt.Errorf("invalid region: %s", region)
	}

	if err != nil {
		return fmt.Errorf("failed to send message to Kafka topic %s in %s region: %w", topic, region, err)
	}

	log.Printf("Message successfully sent to topic %s in %s region", topic, region)
	return nil
}
