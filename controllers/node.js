module.exports.getInfo = (blockchain) => {
  return (req, res) => {
    res.send({
      about: "SoftUniChain/0.0009-nodeJs",
      nodeName: "JS-Node-1",
      peers: blockchain.peers.length,
      blocks: blockchain.blocks.length,
      pendingTransactions: blockchain.pendingTransactions.length,
      confirmedTransactions: blockchain.confirmedTransactions.length,
      cummulativeDifficulty: blockchain.difficulty,
    })
  }
}

module.exports.getBlocks = (blockchain) => {
  return (req, res) => {
    res.send(blockchain.chain)
  }
}

module.exports.getBlockByIndex = (blockchain) => {
  return (req, res) => {
    res.send(blockchain.chain[req.params.index])
  }
}

module.exports.notify = (blockchain) => {
  return (req, res) => {
    throw new Error('Not implemented')
  }
}

module.exports.getPeers = (blockchain) => {
  return (req, res) => {
    res.send(blockchain.getPeers())
  }
}

module.exports.addPeer = (blockchain) => {
  return (req, res) => {
    blockchain.addPeer(req.body.url)
  }
}

module.exports.createTransaction = (blockchain) => {
  return (req, res) => {
    const data = req.body

    if (!blockchain.hasBalance(data.from, data.value)) {
      return res.sendStatus(400)
    }

    const transaction = blockchain.createTransaction(data)
    res.status(201).send({
      "transactionHash": transaction.transactionHash
    }
    )
  }
}

module.exports.getTransaction = (blockchain) => {
  return (req, res) => {
    throw new Error('Not implemented')
  }
}

module.exports.getTransactionInfo = (blockchain) => {
  return (req, res) => {
    throw new Error('Not implemented')
  }
}

module.exports.getBalance = (blockchain) => {
  return (req, res) => {
    const addr = req.params.address
    if (!blockchain.hasBalance(addr)) {
      return res.send({
        "address": addr,
        "confirmedBalance": 0,
        "lastMinedBalance": 0,
        "pendingBalance": 0
      })
    }

    const balance = blockchain.getBalance(addr)

    res.send({
      "address": address,
      "confirmedBalance": balance,
      "lastMinedBalance": balance,
      "pendingBalance": balance
    })
  }
}


